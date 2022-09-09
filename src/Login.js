import { useState } from "react"
import { Alert } from "react-bootstrap"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ApiPost } from "./api"
import Header from "./Header"

const Login = () => {
  const [userid, setUserID] = useState('')
  const [password, setPassword] = useState('')

  const [alertState, setAlert] = useState({ variant: 'warning', label: '' })

  const navigate = useNavigate()

  const handleButton = async () => {
    if (userid === '' || password === '') {
      setAlert({ variant: 'warning', label: 'Mohon lengkapi isian' })
      return
    }
    const respon = await ApiPost('/user/signin', JSON.stringify({ userid, password }))
    let alertMsg = 'Gagal Login'
    if (typeof respon.status === 'number' && respon.status === 200 && typeof respon.data !== 'undefined') {
      const { ok, message, data } = respon.data
      if (typeof data === 'string') alertMsg = data
      if (typeof ok === 'boolean' && ok === true) {
        localStorage.setItem('token', data)
        setAlert({ variant: 'success', label: 'Berhasil Login' })
        await new Promise(r => setTimeout(r, 3000))
        navigate('/')
        return
      }
    }
    setAlert({ variant: 'danger', label: alertMsg })
  }

  const removeAlert = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
    setAlert({ ...alertState, label: '' })
  }

  if (alertState.label !== '') removeAlert()
  return (
    <>
      <Header />
      <main className="form-container">
        <Form className="form-box w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <p>Belum Registrasi? <Link to="/register">Register</Link></p>
          {alertState.label !== '' && <Alert variant={alertState.variant} className="w-100">{alertState.label}</Alert>}
          <FloatingLabel label="User ID" controlId="formUserID">
            <Form.Control className="atas" placeholder="jhondoe" onChange={(e) => setUserID(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" controlId="formPassword">
            <Form.Control className="bawah" placeholder="pasword" type="password" onChange={(e) => setPassword(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <Button className="w-100 mt-3" onClick={handleButton}>Login</Button>
        </Form>
      </main>
    </>
  )
}

export default Login