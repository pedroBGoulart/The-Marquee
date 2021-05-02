
const handleLogin = async (inputEvent, form) => {
    inputEvent.preventDefault() // stops form submission
    const updateLoginStatus = makeHtmlUpdater(document.querySelector('[js-data=login-status]'))
    updateLoginStatus('Verificando Informações');

    const formData = getFormData(form);
    const isUserAuthorized = await getAuth(formData);
    const statusMessage = makeStatusMessage(isUserAuthorized)
    updateLoginStatus(statusMessage)

    if (isUserAuthorized == 'ok')
        setTimeout(() => window.location.href = '?page=home', 3000);
}

function makeStatusMessage(isUserAuthorized) {
    if (isUserAuthorized == 'no')
        return "Senha ou Usuário incorreto(s)"
   
    return "Login realizado; Redirecionando em 3 segundos"
}

const makeHtmlUpdater = (element) => (statusMessage) => {
    element.innerHTML = statusMessage
}

async function getAuth(formData) {
    return await (await fetch("auth/auth.php", {
        body: formData,
        method: "post"
    })).text();
}

function getFormData(form) {
    let formData = new FormData();
    formData.append('user_name', form['user_name'].value);
    formData.append('user_password', form['user_password'].value);
    return formData;
}
