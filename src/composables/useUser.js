import {auth, firebase} from '../firebase'
import {useRouter} from 'vue-router'
// import {ref} from 'vue'

export const useUser = () => {

    const router = useRouter()

    const singIn = async() => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            router.push('/perfil')
        } catch (error) {
            console.log(error)
        }
    }

    const singOut = async() => {
        try {
            await auth.signOut()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    

    return {singIn, singOut}
}