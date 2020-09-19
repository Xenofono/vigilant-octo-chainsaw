import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {logout} from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'

export const Logout = (props) => {

    useEffect(() => {
        props.onLogout()
    })

    return (
        <Redirect to="/"></Redirect>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
