// Action Types
export const VIEWED_DOCUMENTS = 'VIEWED_DOCUMENTS';
export const VIEWED_DOCUMENTS_EDIT = 'VIEWED_DOCUMENTS_EDIT';
export const NO_TOUR = 'NO_TOUR';
export const SHOW_DOCUMENTS_TOUR = 'SHOW_DOCUMENTS_TOUR';
export const SHOW_DOCUMENTS_EDIT_TOUR = 'SHOW_DOCUMENTS_EDIT_TOUR';

// Actions
export const viewedDocuments = () => ({
  type: VIEWED_DOCUMENTS,
});
export const viewedDocumentsEdit = () => ({
  type: VIEWED_DOCUMENTS_EDIT,
});
export const noTour = () => ({
  type: NO_TOUR,
});
export const showDocumentsTour = () => ({
  type: SHOW_DOCUMENTS_TOUR,
});
export const showDocumentsEditTour = () => ({
  type: SHOW_DOCUMENTS_EDIT_TOUR,
});

// Reducer
export default function tour(
  state = {
    documentsTour: true, // Has the offer to tour the documents view been dismissed?
    documentsEditTour: true, // Has the offer to tour the documents edit/new view been dismissed?
    showDocsEditTour: false, // Should the documents edit/new tour be shown?
    showDocsTour: false, // Should the documents view tour be shown?
  },
  action
) {
  switch (action.type) {
    case VIEWED_DOCUMENTS:
      return {
        ...state,
        documentsTour: false,
        showDocsTour: false,
      };
    case VIEWED_DOCUMENTS_EDIT:
      return {
        ...state,
        documentsEditTour: false,
        showDocsEditTour: false,
      };
    case NO_TOUR:
      return {
        ...state,
        documentsTour: false,
        documentsEditTour: false,
        showDocsTour: false,
        showDocsEditTour: false,
      };
    case SHOW_DOCUMENTS_TOUR:
      return {
        ...state,
        showDocsTour: true,
      };
    case SHOW_DOCUMENTS_EDIT_TOUR:
      return {
        ...state,
        showDocsEditTour: true,
      };
    default:
      return {
        ...state,
      };
  }
}
