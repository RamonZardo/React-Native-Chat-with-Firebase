import Rotas from './src/rotas'
import { NativeBaseProvider } from 'native-base';





export default function App() {
  return (
    <NativeBaseProvider>
      <Rotas/>
    </NativeBaseProvider>
     
  );
}





