/**
 * App
 *
 * 애플리케이션 최상위 컴포넌트입니다.
 *
 * AuthProvider를 최상위에 배치하여
 * PatternEditor를 포함한 모든 React 컴포넌트에서
 * 로그인 상태를 사용할 수 있도록 합니다.
 */

import PatternEditor from "./pages/PatternEditor";

import { AuthProvider } from "./context/AuthContext";


function App() {

    return (

        <AuthProvider>

            <PatternEditor />

        </AuthProvider>

    );

}


export default App;