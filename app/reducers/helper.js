export const stateForApi = (apiType, action, data=null) => {
    const loading = apiType + '_LOADING'
    const success = apiType + '_SUCCESS'
    const error = apiType + '_ERROR'

    const stateData = data ? data : action.data
    switch(action.type) {
        case loading:
            return {
                loading: true,
                error: null
            }
        case success:
            return {
                loading: false,
                data: stateData,
                error: null
            }
        case error:
            return {
                loading: false,
                error: action.error
            }
        default:
            return {}
    }
}
