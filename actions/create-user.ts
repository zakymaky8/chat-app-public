"use server"


type TFormState = {
    success: boolean,
    message?: string,
    error?: Error,
    redirectUrl?: string
}


export const createUserAction = async (prev: TFormState, formdata: FormData) => {
    const url = `${process.env.API_URL}/register`

    const USERDATA = {
        firstname: formdata.get("firstname") as string,
        lastname: formdata.get("lastname") as string,
        username: formdata.get("username") as string,
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
        cpwd: formdata.get("cpwd") as string,
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(USERDATA)
        })

        const {success, message} = await response.json()
        return { success, message }
    }

    catch (err: unknown) {
        return {
            success: false,
            error: err as Error
        }
    }
}