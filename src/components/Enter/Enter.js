import './Enter.scss'

function Enter() {
    return <section className="enter">
        <form className="enter__form">
            <div className="enter__form-input">
                <label htmlFor="email" className="enter__label">
                    Email:
                </label>
                <input className="enter__input" type="email" placeholder="jonjones@gmail.com"/>
                <p className='enter__description'>
                    We will send the confirmation link&nbsp;to&nbsp;your&nbsp;email&nbsp;✅ <br/><br/>
                    Once&nbsp;it's&nbsp;activated, you&nbsp;can access our&nbsp;app through this 
                    device without a&nbsp;password&nbsp;🔐
                
                </p>
            </div>
            <button className="enter__button">
                Enter email
            </button>
        </form>
    </section>
}

export default Enter;