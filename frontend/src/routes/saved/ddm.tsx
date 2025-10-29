import { createFileRoute } from '@tanstack/react-router'
import SavedDdmList from '../../components/saved/SavedDdmList'

export const Route = createFileRoute('/saved/ddm')({
  component: SavedDdmList,
})
