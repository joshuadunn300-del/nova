import { useCallback, useMemo, useState } from 'react';
import { createHistory, push, undo, redo, canUndo, canRedo } from './history.js';
import { getAtPath, setAtPath } from './contentPath.js';
import { moveSection, duplicateSection, deleteSection, toggleVisible, addSection } from './sectionOps.js';

const STORAGE_PREFIX = 'nova.editor.doc.'; // TEMP: localStorage save fallback until Terminal 1's API is live.

export function useEditorState(siteId, initialDoc) {
  const [hist, setHist] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_PREFIX + siteId) : null;
    return createHistory(saved ? JSON.parse(saved) : initialDoc);
  });
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saved | dirty
  const [published, setPublished] = useState(false);

  const doc = hist.present;
  // Bumps only on changes the iframe DOM doesn't already reflect itself (structural ops,
  // theme, undo/redo). Live text edits come FROM the iframe's own contenteditable input,
  // so re-rendering srcDoc for those would reload the iframe and wipe cursor position mid-keystroke.
  const [renderVersion, setRenderVersion] = useState(0);

  const apply = useCallback((mutator, { rerender = true } = {}) => {
    setHist((h) => push(h, mutator(h.present)));
    setSaveStatus('dirty');
    if (rerender) setRenderVersion((v) => v + 1);
  }, []);

  const editText = useCallback((path, value) => {
    apply((d) => (getAtPath(d, path) === value ? d : setAtPath(d, path, value)), { rerender: false });
  }, [apply]);

  const editTheme = useCallback((key, value) => {
    apply((d) => setAtPath(d, `theme.${key}`, value));
  }, [apply]);

  // Generic setter for non-section metadata (SEO, domain) — not part of the spec's
  // content_json section schema, but the Settings tab needs somewhere to put it.
  const editMeta = useCallback((path, value) => {
    apply((d) => setAtPath(d, path, value));
  }, [apply]);

  const move = useCallback((index, dir) => apply((d) => moveSection(d, index, dir)), [apply]);
  const duplicate = useCallback((index) => apply((d) => duplicateSection(d, index)), [apply]);
  const remove = useCallback((index) => apply((d) => deleteSection(d, index)), [apply]);
  const toggleHidden = useCallback((index) => apply((d) => toggleVisible(d, index)), [apply]);
  const add = useCallback((type, atIndex) => apply((d) => addSection(d, type, atIndex)), [apply]);

  const doUndo = useCallback(() => { setHist((h) => undo(h)); setRenderVersion((v) => v + 1); }, []);
  const doRedo = useCallback(() => { setHist((h) => redo(h)); setRenderVersion((v) => v + 1); }, []);

  const save = useCallback(() => {
    // TEMP: persists to localStorage. Swap for Terminal 1's saveSite call when live (INTEGRATION REQUEST logged).
    window.localStorage.setItem(STORAGE_PREFIX + siteId, JSON.stringify(doc));
    setSaveStatus('saved');
  }, [siteId, doc]);

  const publish = useCallback(() => { save(); setPublished(true); }, [save]);
  const unpublish = useCallback(() => setPublished(false), []);
  const republish = useCallback(() => { save(); setPublished(true); }, [save]);

  return useMemo(() => ({
    doc, renderVersion, saveStatus, published,
    canUndo: canUndo(hist), canRedo: canRedo(hist),
    editText, editTheme, editMeta, move, duplicate, remove, toggleHidden, add,
    undo: doUndo, redo: doRedo, save, publish, unpublish, republish,
  }), [doc, renderVersion, saveStatus, published, hist, editText, editTheme, editMeta, move, duplicate, remove, toggleHidden, add, doUndo, doRedo, save, publish, unpublish, republish]);
}
