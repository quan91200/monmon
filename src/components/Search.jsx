import { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const Search = ({ onSearch, onClear }) => {
    const [search, setSearch] = useState('')

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchClick = () => {
        onSearch(search) // Gửi từ khóa tìm kiếm lên component cha
    }

    const handleClear = () => {
        setSearch('')
        onClear() // Xóa kết quả tìm kiếm trong component cha
    }

    return (
        <div className="flex space-x-4">
            <input
                type="text"
                placeholder="Search by content, nickname, or name"
                className="px-4 py-2 border border-gray-300 rounded-lg"
                value={search}
                onChange={handleSearchChange}
            />
            <Button
                className="px-4 py-2 border border-gray-300 rounded-lg"
                onClick={handleSearchClick}
            >
                Search
            </Button>
            <Button
                className="px-4 py-2 border border-gray-300 rounded-lg"
                onClick={handleClear}
            >
                Clear
            </Button>
        </div>
    )
}

export default Search

Search.propTypes = {
    onSearch: PropTypes.node,
    onClear: PropTypes.node
}