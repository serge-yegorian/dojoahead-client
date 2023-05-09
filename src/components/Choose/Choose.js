import { Link } from 'react-router-dom';
import './Choose.scss'

function Choose() {
    return (
        <section className="choose">
            <form className='choose__form'>
                <Link className='choose__link' to='/zip'>
                    <h2 className='choose__user'>Student</h2>
                    <p className='choose__description'>I am looking for&nbsp;a&nbsp;gym&nbsp;🥋</p>
                </Link>
                <Link className='choose__link'>
                    <h2 className='choose__user'>Gym Owner</h2>
                    <p className='choose__description'>I am looking for&nbsp;new&nbsp;students&nbsp;💰</p>
                </Link>
            </form>
        </section>
    )
}

export default Choose;