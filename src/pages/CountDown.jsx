import CountTime from '../components/CountTime'
import targetDate from '../api/users.json'

const CountDown = () => {
    const Date = targetDate.targetDate
    return (
        <div>
            <CountTime targetDate={Date} />
        </div>
    )
}

export default CountDown