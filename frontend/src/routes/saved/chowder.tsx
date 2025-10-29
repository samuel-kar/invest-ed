import { createFileRoute } from '@tanstack/react-router'
import SavedChowderList from '../../components/saved/SavedChowderList'

export const Route = createFileRoute('/saved/chowder')({
  component: SavedChowderList,
})
