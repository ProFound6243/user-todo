import { useEffect, useState } from "react"
import { FaUser, FaTrashAlt, FaUserEdit } from "react-icons/fa"

function App() {

	const [userTodo, setUserTodo] = useState([])
	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		email: ""
	})
	const [error, setError] = useState(null)
	const [add, setAdd] = useState(false)

	const handleForm = (e) => {
		e.preventDefault()
		setError(null)

		if(user.email == ""){setError("Email Name must be required")}
		if(user.last_name == ""){setError("Last Name must be required")}
		if(user.first_name == ""){setError("First Name must be required")}
		
		userTodo.forEach((item) => {
			if (item.email === user.email) {setError("This user already exist")}
		})
		
		setAdd(true)
		
	}


	const deleteUser = (index) => {
		setUserTodo(userTodo.filter((todo, itodo) => itodo != index))
	}

	useEffect(() => {
		
		if (add) {
			if (error === null) {
				setUserTodo([user, ...userTodo])
			}
			setAdd(false)
		}

	}, [add])


	return (
		<>
			
			<section className="relative min-w-screen min-h-screen grid grid-cols-1 gap-8 py-16">

				<div className="relative container mx-auto p-4 flex flex-col gap-16">
					

					<form onSubmit={(e) => handleForm(e)} className="relative mx-auto w-full max-w-[512px] grid grid-cols-2 gap-4">

						<label htmlFor="first_name" className="relative flex border rounded-md overflow-hidden">
							<input id="first_name" 
									type="text"
									onChange={(e) => setUser({
										first_name: e.target.value,
										last_name: user.last_name,
										email: user.email
									})} 
									className="relative w-auto grow focus:outline-none px-4 py-2" 
									placeholder="First Name"
									/>
						</label>

						<label htmlFor="last_name" className="relative flex border rounded-md overflow-hidden">
							<input id="last_name" 
									type="text"
									onChange={(e) => setUser({
										first_name: user.first_name,
										last_name: e.target.value,
										email: user.email,
									})} 
									className="relative w-auto grow focus:outline-none px-4 py-2" 
									placeholder="Last Name"
									/>
						</label>

						<label htmlFor="email" className="relative flex border rounded-md overflow-hidden col-span-2">
							<input id="email" 
									type="email" 
									onChange={(e) => setUser({
										first_name: user.first_name,
										last_name: user.last_name,
										email: e.target.value,
									})}
									className="relative w-auto grow focus:outline-none px-4 py-2" 
									placeholder="Last Name"
									/>
						</label>
						
						{error != null ? (<p className="relative col-span-2 text-sm text-red-500">{error}</p>) : ("")}

						<button type="submit" className="relative px-4 py-2 bg-orange-500 rounded-md text-white font-medium col-span-2 hover:bg-orange-400 transition-all">Add User</button>


					</form>
					
					{userTodo.length !== 0 ? (
						<div className="relative mx-auto w-full max-w-[512px] grid grid-cols-1 gap-4">

							{userTodo.map((item, index) => 

								<div key={index} className="relative p-4 shadow-md rounded-md border flex items-center gap-4">

									<div className="relative w-auto h-auto">
										<figure className="relative w-10 h-10 rounded-full grid place-content-center bg-gray-300">
											<FaUser className="relative text-gray-500" />
										</figure>
									</div>

									<div className="relative grow h-auto flex flex-col justify-around">
										<h3 className="relative font-medium">{item.email}</h3>
										<p className="relative text-sm text-stone-500 capitalize">{item.first_name} {item.last_name}</p>
									</div>

									<div className="relative flex gap-4">

										<button className="relative hover:scale-[1.1] hover:text-orange-500 transition-all">
											<FaUserEdit />
										</button>

										<button onClick={() => { deleteUser(index) }} className="relative hover:scale-[1.1] hover:text-orange-500 transition-all">
											<FaTrashAlt />
										</button>

									</div>

								</div>

							)}
						
						</div>
					) : ("")}

				</div>

			</section>

		</>

	)}

export default App
