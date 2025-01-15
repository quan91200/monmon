import PropTypes from 'prop-types'
import Modal from './Modal'
import { useTranslation } from 'react-i18next'
import Tooltip from './Tooltip'
import { IoMdClose } from "react-icons/io"

const ModalSettingFireWorks = ({
    isOpen,
    onClose,
    settings,
    updateSettings
}) => {
    const [t] = useTranslation('global')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type
            === 'checkbox'
            ? checked
            : type === 'number'
                ? parseFloat(value)
                : value
        updateSettings({
            [name]: newValue,
        })

        // Nếu người dùng thay đổi fullscreen
        if (name === 'fullscreen') {
            if (checked) {
                // Yêu cầu chuyển chế độ toàn màn hình
                document.documentElement.requestFullscreen()
            } else {
                // Thoát chế độ toàn màn hình
                if (document.exitFullscreen) document.exitFullscreen()
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="center">
            <div className="py-4 bg-[rgba(0,0,0,.8)] rounded-lg shadow-lg w-96 relative">
                <h3 className="text-lg font-bold mb-4 text-gray-200">{t('fireworks.settings')}</h3>

                {/* Shell Type */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.shellType.body')}>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.shellType.header')}
                        </label>
                    </Tooltip>
                    <select
                        name="shellType"
                        value={settings.shellType || 'Random'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    >
                        <option value="Random">Random</option>
                        <option value="Crackle">Crackle</option>
                        <option value="Crossette">Crossette</option>
                        <option value="Crysanthemum">Crysanthemum</option>
                    </select>
                </div>

                {/* Shell Size */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.shellSize.body')} position='bottom'>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.shellSize.header')}
                        </label>
                    </Tooltip>
                    <input
                        type="number"
                        name="shellSize"
                        min="1"
                        max="10"
                        value={settings.shellSize || 5}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    />
                </div>

                {/* Quality */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.quality.body')} position='bottom'>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.quality.header')}
                        </label>
                    </Tooltip>
                    <select
                        name="quality"
                        value={settings.quality || 'Normal'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    >
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Sky Lighting */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.skyLighting.body')}>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.skyLighting.header')}
                        </label>
                    </Tooltip>
                    <select
                        name="skyLighting"
                        value={settings.skyLighting || 'Normal'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    >
                        <option value="None">None</option>
                        <option value="Dim">Dim</option>
                        <option value="Normal">Normal</option>
                    </select>
                </div>

                {/* Scale Factor */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.scaleFactor.body')} position='bottom'>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.scaleFactor.header')}
                        </label>
                    </Tooltip>
                    <input
                        type="number"
                        name="scaleFactor"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={settings.scaleFactor || 1}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    />
                </div>
                {/* Speed Settings */}
                <div className="mb-3">
                    <Tooltip content={t('fireworks.speed.body')} position='bottom'>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                            {t('fireworks.speed.header')}
                        </label>
                    </Tooltip>
                    <input
                        type="number"
                        name="speed"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={settings.speed || 0.6}
                        onChange={handleInputChange}
                        className="w-full border border-gray-500 rounded-md p-2 text-black bg-gray-200"
                    />
                </div>

                {/* Checkbox Settings */}
                {[
                    { name: 'autoLaunch', label: t('fireworks.autoLaunch.header') },
                    { name: 'finaleMode', label: t('fireworks.finaleMode.header') },
                    { name: 'hideControls', label: t('fireworks.hideControls.header') },
                    { name: 'fullscreen', label: t('fireworks.fullscreen.header') },
                    { name: 'experimental', label: t('fireworks.experimental.header') },
                ].map((checkbox) => (
                    <div className="mb-3 flex items-center" key={checkbox.name}>
                        <Tooltip content={t(`fireworks.${checkbox.name}.body`)} position='bottom'>
                            <input
                                type="checkbox"
                                name={checkbox.name}
                                checked={settings[checkbox.name] || false}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                        </Tooltip>
                        <label className="text-sm font-medium text-gray-200">
                            {checkbox.label}
                        </label>
                    </div>
                ))}
                {/* Close Button */}
                <span
                    onClick={onClose}
                    className="cursor-pointer absolute right-4 top-6 text-white hover:text-gray-500"
                >
                    <IoMdClose size={20} />
                </span>
            </div>
        </Modal>
    )
}

ModalSettingFireWorks.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    settings: PropTypes.shape({
        shellType: PropTypes.string,
        shellSize: PropTypes.number,
        quality: PropTypes.string,
        skyLighting: PropTypes.string,
        scaleFactor: PropTypes.number,
        speed: PropTypes.number,
        autoLaunch: PropTypes.bool,
        finaleMode: PropTypes.bool,
        hideControls: PropTypes.bool,
        fullscreen: PropTypes.bool,
        experimental: PropTypes.bool,
    }).isRequired,
    updateSettings: PropTypes.func.isRequired,
}

export default ModalSettingFireWorks