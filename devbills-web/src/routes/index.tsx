import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />

					<Route element={<PrivateRoutes />}>
						<Route element={<AppLayout />}>
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
					</Route>

					<Route path="*" element={<h2>Pagina nao encontrada</h2>} />
					{/* Add more routes here as needed */}
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
