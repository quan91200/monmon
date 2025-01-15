import { useState, useEffect } from "react"
import useDarkMode from "../hooks/useDarkMode"
import useLanguage from "../hooks/useLanguage"
import Button from "../components/Button"
import Toast from "../components/Toast"
import positionClasses from "../utils/spFunc"
import BackButton from '../components/BackButton'
import { FaChevronLeft } from "react-icons/fa"

const Settings = () => {
    const { darkMode, enableDarkMode, disableDarkMode } = useDarkMode(false)
    const { currentLanguage, changeLanguage, t } = useLanguage()
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastPosition, setToastPosition] = useState("top-right")
    const [snowEffectEnabled, setSnowEffectEnabled] = useState(
        localStorage.getItem('snowEffect') === 'false'
    )

    useEffect(() => {
        // Lưu trạng thái tuyết vào localStorage
        localStorage.setItem('snowEffect', snowEffectEnabled ? 'true' : 'false')
    }, [snowEffectEnabled])

    const handlePositionChange = (e) => {
        setToastPosition(e.target.value)
    }

    const handleLanguageChange = (lang) => {
        changeLanguage(lang)
        setToastMessage(t("toast.lang"))
        setToastOpen(true)
    }

    const handleDarkModeToggle = (isEnabled) => {
        isEnabled ? enableDarkMode() : disableDarkMode()
        setToastMessage(isEnabled ? t("toast.dark") : t("toast.light"))
        setToastOpen(true)
    }

    const handleSnowEffectToggle = () => {
        setSnowEffectEnabled(prev => !prev)
        const isEnabled = !snowEffectEnabled
        localStorage.setItem('snowEffect', isEnabled ? 'true' : 'false')
    }

    return (
        <div className="laptop:max-w-5xl ipad-h:max-w-4xl ipad-v:max-w-2xl mobile:max-w-xs mx-auto py-8">
            <div className="flex flex-col space-y-5">
                <div className="flex items-center justify-between space-x-2">
                    <BackButton to="/" variant="outline" icon={<FaChevronLeft />} />
                    <h3>{t('route.settings')}</h3>
                </div>

                {/* Ngôn ngữ */}
                <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold dark:text-gray-100">{t("lang")}</h2>
                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={() => handleLanguageChange("en")}
                            variant={currentLanguage === "en" ? "info" : "outlineSecondary"}
                        >
                            EN
                        </Button>
                        <Button
                            onClick={() => handleLanguageChange("vn")}
                            variant={currentLanguage === "vn" ? "info" : "outlineSecondary"}
                        >
                            VN
                        </Button>
                    </div>
                </div>

                {/* Chế độ tối */}
                <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{t("mode")}</h2>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-md">
                            <span>{t("dark.on")}</span>
                            <input
                                type="radio"
                                name="theme"
                                checked={darkMode}
                                onChange={() => handleDarkModeToggle(true)}
                            />
                        </label>
                        <label className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-md">
                            <span>{t("dark.off")}</span>
                            <input
                                type="radio"
                                name="theme"
                                checked={!darkMode}
                                onChange={() => handleDarkModeToggle(false)}
                            />
                        </label>
                    </div>
                </div>

                {/* Vị trí thông báo */}
                <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{t("notifi")}</h2>
                    <div className="flex gap-4 mt-4 ipad-v:flex-row mobile:flex-col ipad-v:items-center mobile:items-start">
                        {Object.keys(positionClasses).map((position) => (
                            <label key={position} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="position"
                                    value={position}
                                    checked={toastPosition === position}
                                    onChange={handlePositionChange}
                                    className="mr-2"
                                />
                                {t(`positions.${position}`)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tuyết */}
                <div className="p-5 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold">{t("route.snow")}</h2>
                    <label className="flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-md">
                        <span>{t("snow.enabled")}</span>
                        <input
                            type="checkbox"
                            checked={snowEffectEnabled}
                            onChange={handleSnowEffectToggle}
                        />
                    </label>
                </div>
            </div>

            {/* Toast */}
            <Toast
                open={toastOpen}
                onClose={() => setToastOpen(false)}
                message={toastMessage}
                type="success"
                pos={toastPosition}
                duration={2000}
            />
        </div>
    )
}

export default Settings