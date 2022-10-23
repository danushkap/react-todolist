const apiRequest = async (url = '', optionsObj = null, err = null) => {
    let response;
    try {
        response = await fetch(url, optionsObj)
        if (!response.ok) throw Error('Server did not respond')
    } catch (innerErr) {
        err = innerErr
    } finally {
        return [response, err]
    }
}

export default apiRequest;
