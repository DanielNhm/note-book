import { eventBusService } from '../../../services/event-bus.service.js'

export function FilterByName() {
    function handleSearchChange(event) {
        const query = event.target.value
        eventBusService.emit('set-filter', { txt: query }) 
    }

    return (
        <section className="filter-by-name">
            <form>
                <div className="search">
                    <span className="search-icon material-symbols-outlined">search</span>
                    <input
                        className="search-input"
                        type="search"
                        name="txt"
                        placeholder="Search"
                        onChange={handleSearchChange} 
                    />
                </div>
            </form>
        </section>
    )
}