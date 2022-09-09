import { type } from "@testing-library/user-event/dist/type"
import { useState } from "react"
import { Alert } from "react-bootstrap"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ApiPost } from "./api"
import Header from "./Header"

const Register = () => {
  const [name, setName] = useState('')
  const [userid, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const [verifikasipassword, setVerifikasiPassword] = useState('')

  const [alertState, setAlert] = useState({ variant: 'warning', label: '' })

  const navigate = useNavigate()

  const handleButton = async () => {
    if (name === '' || userid === '' || password === '') {
      setAlert({ variant: 'warning', label: 'Mohon lengkapi isian' })
      return
    }
    if (verifikasipassword !== password) {
      setAlert({ variant: 'warning', label: 'Verifikasi password harus sama dengan password di atasnya' })
      return
    }
    const respon = await ApiPost('/user/reg', JSON.stringify({ name, userid, password }))
    let alertMsg = 'Gagal Registrasi'
    if (typeof respon.status === 'number' && respon.status === 200 && typeof respon.data !== 'undefined') {
      const { ok, message, data } = respon.data
      if (typeof data === 'string') alertMsg = data
      if (typeof ok === 'boolean' && ok === true) {
        setAlert({ variant: 'success', label: 'Berhasil Registrasi' })
        await new Promise(r => setTimeout(r, 3000))
        navigate('/login')
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
          <h1 className="h3 mb-3 fw-normal">Register</h1>
          <p>Sudah Registrasi? <Link to="/login">Login</Link></p>
          {alertState.label !== '' && <Alert variant={alertState.variant} className="w-100">{alertState.label}</Alert>}
          <FloatingLabel label="Nama" controlId="formNama">
            <Form.Control className="atas" placeholder="jhondoe" onChange={(e) => setName(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="User ID" controlId="formUserID">
            <Form.Control className="tengah" placeholder="jhondoe" onChange={(e) => setUserID(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" controlId="formPassword">
            <Form.Control className="tengah" placeholder="pasword" type="password" onChange={(e) => setPassword(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Verifikasi Password" controlId="formUlangiPassword">
            <Form.Control className="bawah" placeholder="pasword" type="password" onChange={(e) => setVerifikasiPassword(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <Button className="w-100 mt-3" onClick={handleButton}>Registrasi</Button>
        </Form>
      </main>
    </>
  )
}

export default Register