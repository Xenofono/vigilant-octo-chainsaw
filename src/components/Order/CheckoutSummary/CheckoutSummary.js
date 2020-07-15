import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import css from './CheckoutSummary.module.css'

const CheckoutSummar = (props) => {

    return(
        <div className={css.CheckoutSummary}>
            <h1>Smaklig måltid!</h1>
            <div style={{width:"100%",  margin:"auto"}}>
            <Burger ingredients={props.ingredients}></Burger>
            </div>
            <Button btnType="Danger" clicked={props.onCancelCheckout}>AVBRYT</Button>
            <Button btnType="Success" clicked={props.onContinueCheckout}>FORTSÄTT</Button>
        </div>
    )
}

export default CheckoutSummar;
