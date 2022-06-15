async function send<R = resp.Result> (u: URL, reqInit: RequestInit) {
    let res: R | resp.Result | null = null
    let status: resp.Status | null = null

    try {
        const resp = await fetch(u.toString(), reqInit)

        if (resp.redirected)
            window.location.href = resp.url

        res = await (resp.ok ? resp.json() : resp.text()) ?? { status: 'ok' }

        if (resp.status == 403) {
            if (typeof window != 'undefined')
                window.location.href = '/login'
            else
                status = 'denied'
        }
        else if (!res || !resp.ok)
            status = 'error'
    }
    catch (e) {
        //console.debug(now() + ' | send | ' + e)
        status = 'error'
    }

    console.debug(/*now() +*/ ' | send | res = ' + JSON.stringify(res))

    return status
        ? { status } as resp.Result
        : res!!
}

async function fetchJson<R = resp.Result> (url: string, method: api.HttpMethod, data: any) {
    const u = new URL(url)

    console.debug(u.toString(), data)

    const reqInit: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }

    for (let p in data)
        if (data[p] == undefined)
            delete data[p]

    if (method == 'GET') {
        const params = new URLSearchParams()
        for (const key in data)
            if (Array.isArray(data[key]))
                for (const v of data[key])
                    params.append(key, v)
            else params.append(key, data[key])
        u.search = params.toString()
    }
    else if (method == 'POST') {
        reqInit.body = JSON.stringify(data)
    }

    return send<R>(u, reqInit)
}

export async function get<R> (url: string, params: any) {
    return fetchJson<R>(url, 'GET', params)
}

export async function post<R = resp.Result> (url: string, body: any) {
    return fetchJson<R>(url, 'POST', body)
}

export async function postFormData<R = resp.Result> (url, data) {
    const u = new URL(url)

    console.debug(u.toString(), data)

    for (let p in data)
        if (data[p] == undefined)
            delete data[p]


    const body = new FormData()
    for (const field in data) {
        if (Array.isArray(data[field]))
            for (const v of data[field])
                body.append(field, v)
        else
            body.append(field, data[field])
    }

    const reqInit = {
        body,
        method: 'POST',
        headers: {

        }
    } as RequestInit

    return send<R>(u, reqInit)
}

