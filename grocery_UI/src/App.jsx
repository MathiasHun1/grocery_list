import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import StdButton from './components/StdButton'
import InputField from './components/InputField'
import loginService from './services/loginService'
import regiterService from './services/regiterService'
import noteService from "./services/noteService"
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Navbar from './components/Navbar'
import Message from './components/Message'
import Note from './components/Note'
import NoteForm from './components/NoteForm'

function App() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [successMsg, setSuccesMsg] = useState(null)
  const [usersNotes, setUsersNotes] = useState([])
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(true)
  const [showImportant, setShowImportant] = useState(true)
  const [showAll, setShowAll] = useState(true)

  const notesToShow = usersNotes
    .filter(note => (
      showAll ? note : note.important === true
    ))

  const ref = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    const getnotes = async () => {
      const notes = await noteService.getUsersNotes(user.username)
      setUsersNotes(notes)
    }
    if (user) {
      getnotes()
    }
  }, [user])

  const clearFields = () => {
    setName('')
    setUsername('')
    setPassword('')
    setConfirmPass('')
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleImportantChange = () => {
    setImportant(!important)
  }

  const login = async (e) => {
    e.preventDefault()

    try {
      const result = await loginService.userLogin({ username, password })
      setUser(result)

      window.localStorage.setItem('loggedInUser', JSON.stringify(result))

      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMsg('Wrong username or password')
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  }

  const logout = () => {
    setUser(null)
    setUsersNotes([])
    window.localStorage.clear()
  }

  const signup = async (e) => {
    e.preventDefault()
    //try to register new member
    try {
      await regiterService.userRegister({name, username, password, confirmPassword: confirmPass})

      const result = await loginService.userLogin({ username, password })
      setUser(result)

      window.localStorage.setItem('loggedInUser', JSON.stringify(result))

      setName('')
      setUsername('')
      setPassword('')
      setConfirmPass('')
    } catch (err) {
      console.log(err)
      setErrorMsg(err.response.data.error)
      setPassword('')
      setConfirmPass('')
      setTimeout(() => {
        setErrorMsg(null)
      }, 3000)
    }
  }

  const addNote = async (e) => {
    e.preventDefault()

    try {
      if(content === '') {
        return ref.current.toggleVis()
      }
      noteService.setToken(user)
      const result = await noteService.addNote({ content, important })
      setUsersNotes(usersNotes.concat(result))
      setContent('')
      // ref.current.toggleVisibility()
      
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const deleteNote = async (id) => {
    // if(window.confirm('Sure?')) {
      try {
        noteService.setToken(user)
        await noteService.deleteNote(id)
        setUsersNotes(usersNotes.filter(note => note.id !== id))
  
      }catch(err) {
        console.log('error: ', err)
      }
    // }
  }

  const deleteAllNotes = async () => {
    if(window.confirm("Are You Sure?")) {
      try {
        for(let note of usersNotes) {
          noteService.setToken(user)
          await noteService.deleteNote(note.id)
        }
        setUsersNotes([])
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }

  const toggleImportance = async (id) => {
    try {
      const note = usersNotes.find(n => n.id === id)
      const updatedNote = {...note, important: !note.important}
      // updatedNote.important = !updatedNote.important

      const updatedNotes = usersNotes.map(n => n.id !== id ? n : updatedNote)
      setUsersNotes(updatedNotes)
      noteService.setToken(user)
      await noteService.updateNote(id, {important: updatedNote.important})
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <Router>
      <div className='w-full max-w-4xl min-h-screen bg-black flex flex-col items-center relative mx-auto'>

        {!user && (
          <>
            <h1 className=" mt-4 mb-4 text-4xl text-lime-400 font-bold font-sans italic drop-shadow-[0_3px_15px_rgba(100,255,200,1)]">
              NOTE APP
            </h1>


            <Routes>
              <Route path='/' element={<Navbar />}/>

            <Route path='/login' element={<LoginForm
              user={user}
              login={login}
              logout={logout}
              username={username}
              password={password}
              handleUsernameChange={handleUsernameChange}
              handlePassChange={handlePassChange}
              clearFields={clearFields}
              />}
            />

            <Route path='/sign-up' element={<SignupForm
              user={user}
              signup={signup}
              name={name}
              username={username}
              password={password}
              confirmPass={confirmPass}
              handleNameChange={handleNameChange}
              handleUsernameChange={handleUsernameChange}
              handlePassChange={handlePassChange}
              handleConfirmPassChange={handleConfirmPassChange}
              clearFields={clearFields}
              />}
            />
            
            </Routes>
          </>
        )}

        <Message errorMsg={errorMsg} successMsg={successMsg} />

        {user && (
          <>
            <div className='absolute top-2 left-2 gap-2 h-10'>
              <Link to='/'>
                < StdButton text="sign out" onClick={logout} className='p-1 px-2'/>
              </Link>
            </div>
              <p className='text-green-400 font-bold text-center'>
                {user.username}
              </p>

            <NoteForm 
              content={content}
              important={important}
              handleContentChange={handleContentChange}
              handleImportantChange={handleImportantChange}
              addNote={addNote}
              ref={ref}
            />

            < >
              {notesToShow.map(note => (
                <Note 
                  key={note.id}
                  note={note}
                  deleteNote={deleteNote}
                  toggleImportance={toggleImportance}
                  showImportant={showImportant}
                />
              ))}
              {notesToShow.length > 0 && (
                <StdButton text="Cear All" className="w-36" onClick={deleteAllNotes} />
              )}
            </>

            <StdButton 
                text={`${showAll ? "All notes" : "Importants"}`}
                onClick={() => setShowAll(!showAll)}

                className=" p-1 px-2 text-center absolute top-2 right-2" 
            />
          </>

        )}
      </div>
    </Router>
  )
}

export default App
