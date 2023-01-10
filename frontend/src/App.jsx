import { Suspense } from "react"
import { useRoutes } from "react-router"
import routes from "./routes"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import "./styles/Global.css"
function App() {
  const routeToPages = useRoutes(routes);
  return (
    <>
     <Suspense fallback={<h1 className='mx-auto'>Loading...</h1>}>
       {routeToPages}
      </Suspense>
    </>
  )
}

export default App
