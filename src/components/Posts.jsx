import { useState, useEffect } from 'react'
import postData from '../api/users.json'  // Giả sử bạn đã có file dữ liệu này
import { useTranslation } from 'react-i18next'
import Button from './Button'
import Pagination from './Pagination'

const Posts = () => {
    const { posts, users } = postData
    const { t, i18n } = useTranslation("global")
    // eslint-disable-next-line no-unused-vars
    const [lang, setLang] = useState(i18n.language)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5) // Số lượng bài đăng mỗi trang
    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang, i18n])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString(lang, {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
    }
    // Xác định các bài đăng cho trang hiện tại
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Tổng số trang
    const totalPages = Math.ceil(posts.length / postsPerPage)
    // Hàm thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (
        <div className="space-y-6">
            {currentPosts.map((post) => {
                const user = users[post.user_id]
                console.log(user.nickname)
                if (!user) {
                    return (
                        <div key={post.created_at} className="p-4 rounded-lg shadow-lg bg-red-50 border border-red-200 max-w-2xl mx-auto">
                            <p className="text-red-600">{t('userNotFound')}</p>
                        </div>
                    )
                }

                const formattedDate = formatDate(post.created_at)

                return (
                    <div
                        key={post.created_at}
                        className={`p-6 rounded-xl shadow-xl border border-gray-200 max-w-2xl mx-auto ${user.nickname === 'Mon' ? 'bg-pink-200' : 'bg-blue-200'}`}
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-300"
                            />
                            <div>
                                <h3 className="font-semibold text-2xl text-gray-800">{user.name} ({user.nickname})</h3>
                                <span className="text-sm text-gray-500">{formattedDate}</span>
                            </div>
                        </div>
                        <p className="mt-4 text-gray-900 text-lg">{post.content}</p>

                        {post.image && (
                            <div className="mt-6 h-96 w-full">
                                <img
                                    src={post.image}
                                    alt="Post visual"
                                    className="w-full h-full object-contain rounded-lg hover:opacity-80 transition-opacity duration-200"
                                />
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <Button
                                className="transition-all duration-300 ease-in-out transform hover:scale-105 capitalize"
                                variant={`${post.status === 'public' ? 'primary' : 'success'}`}
                            >
                                {t(post.status)}
                            </Button>
                        </div>
                    </div>
                )
            })}

            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                maxPageDisplay={5}
            />
        </div>
    )
}

export default Posts