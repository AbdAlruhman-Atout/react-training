import Button from './Button.jsx'

function FilterButtons({ filter, setFilter }) {
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setFilter('all')}
        disabled={filter === 'all'}
      >
        All
      </Button>

      <Button
        variant="secondary"
        onClick={() => setFilter('active')}
        disabled={filter === 'active'}
      >
        Active
      </Button>

      <Button
        variant="secondary"
        onClick={() => setFilter('completed')}
        disabled={filter === 'completed'}
      >
        Completed
      </Button>
    </div>
  )
}

export default FilterButtons
