import { Button } from "@/components/ui/button"
import { NFIcon } from "@/icons/NFIcon";
import { Link, useRouteError } from "react-router-dom";

interface RouteError {
	message?: string;
	statusText?: string;
}

const ErrorPage = () => {
	const error = useRouteError() as RouteError;
	return (
		<div className="flex items-center justify-center h-screen flex-row">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold text-white">Щось пішло не так</h1>
				<h2>
					{error ? error.statusText || error.message : 'Сторінка, яку ви шукаєте, не існує'}
				</h2>
				<Button asChild>
					<Link to="/">Повернутись назад</Link>
				</Button>
			</div>
			<div className="flex flex-col">
				<NFIcon className="w-96 h-96" />
			</div>
		</div>
	);
};

export default ErrorPage;