import React from 'react'
import { Link } from 'react-router-dom'
export default function Unauthorized() {
    const st = {
        marginTop: '15vh',
    }
    const imgst = {
        maxWidth: '25vw',
        maxHeight: '25vw',
        marginLeft: '29vw'
    }
    const butst = {
        maxWidth: '6vw',
        marginLeft: '-0.3vw'
    }
    return (
        <>
            <div className="card container" style={st}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcY3zPEz9sNd3DqcD8iGk8JKsEFoiwDnGazw&usqp=CAU" className="card-img-top" alt="Unauthorized"
                    style={imgst}
                />
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <h5 className="card-title">Unauthorized</h5>
                    <p className="card-text">Please Login In to continue</p>
                    <Link to="/login" className="btn btn-primary" style={butst}>LogIn</Link>
                </div>
            </div>
        </>
    )
}
