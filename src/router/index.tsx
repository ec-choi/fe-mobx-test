import { createBrowserRouter } from 'react-router-dom'
import { AssignmentConditionPage } from '../pages/assignment/AssignmentConditionPage'
import { AssignmentResultPage } from '../pages/assignment/AssignmentResultPage'
import { AssignmentWorkbookPage } from '../pages/assignment/AssignmentWorkbookPage'

export const router = createBrowserRouter([
  { path: '/', element: <AssignmentConditionPage /> },
  {
    path: 'assignment',
    children: [
      {
        index: true,
        element: <AssignmentConditionPage />,
      },
      {
        path: 'workbook',
        element: <AssignmentWorkbookPage />,
      },
      {
        path: 'result',
        element: <AssignmentResultPage />,
      },
    ],
  },
])
