export default function ({ params, $auth, redirect }) {
    if (params.userName === $auth.user.userName) {
        return redirect("/users/self")
    }
}