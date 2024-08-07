import { reactive, watch } from 'vue'

export type CardType = {
  id: string
  description: string
  color: string
  autoFocus?: boolean
}

export type ColumnType = {
  id: string
  title: string
  cards: CardType[]
  autoFocus?: boolean
}

export type BoardType = {
  id: string
  title: string
  columns: ColumnType[]
}

export function useBoard() {
  const boardStr = localStorage.getItem('board')

  const initialData = boardStr
    ? JSON.parse(boardStr)
    : ({
        id: '1',
        title: 'Board',
        columns: [
          {
            id: '1',
            cards: [],
            title: 'To Do'
          },
          {
            id: '2',
            cards: [],
            title: 'In progress'
          },
          {
            id: '3',
            cards: [],
            title: 'Done'
          }
        ]
      } satisfies BoardType)

  const board = reactive<BoardType>(initialData)

  watch(board, () => {
    localStorage.setItem('board', JSON.stringify(board))
  })

  function addCard(columnId: string) {
    const column = board.columns.find((e) => columnId === e.id)
    if (!column) return

    column.cards.push({
      id: new Date().toISOString(),
      color: 'blue',
      description: '',
      autoFocus: true
    })
  }

  function editCard(
    data: {
      id: string
      columnId: string
    },
    newProps: {
      color?: string
      description?: string
    }
  ) {
    const column = board.columns.find((e) => data.columnId === e.id)
    if (!column) return

    const card = column.cards.find((e) => e.id === data.id)
    if (!card) return

    if (newProps.description !== undefined) {
      card.description = newProps.description
    }

    if (newProps.color !== undefined) {
      card.color = newProps.color
    }
  }

  function addColumn() {
    board.columns.push({
      id: new Date().toISOString(),
      cards: [],
      title: '',
      autoFocus: true
    })
  }

  function editColumn(data: { id: string }, props: { title?: string }) {
    const column = board.columns.find((e) => data.id === e.id)
    if (!column) return

    if (props.title !== undefined) {
      column.title = props.title
    }
  }

  return {
    board,
    addCard,
    editCard,
    editColumn,
    addColumn
  }
}
