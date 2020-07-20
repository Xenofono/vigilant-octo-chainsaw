import React, {useState} from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import css from './ContactData.module.css'

export default function ContactData(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState(null)
    const [loading, setLoading] = useState(false)

    const orderHandler = (e) => {
        e.preventDefault()
           setLoading(true);

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Kristoffer Näsström",
        address: {
          street: "Cevelidsgatan 17",
          zipCode: "86035",
          city: "Söråker"
        },
        email: "test@test.com"
      },
      expressDelivery: true
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false)
        props.history.push("/")
      })
      .catch((err) => {
        setLoading(false)
      });
    }

    return !loading ? (
        <div className={css.ContactData}>
            <h4>Dina kontaktuppgifter</h4>
            <form>
                <input className={css.Input} type="text" name="name" placeholder="Ditt namn"></input>
                <input className={css.Input} type="email" name="email" placeholder="Din epost"></input>
                <input className={css.Input} type="text" name="street" placeholder="Gatuadress"></input>
                <input className={css.Input} type="text" name="postal" placeholder="Postnummer"></input>
                <Button btnType="Success" clicked={orderHandler}>BESTÄLL</Button>
            </form>
        </div>
    ) : <Spinner></Spinner>
}
