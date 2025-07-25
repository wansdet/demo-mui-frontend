import { useSearchParams } from 'react-router'

function useQueryParams() {
    const [searchParams] = useSearchParams()

    // Function to get a specific query parameter value
    function getQueryParam(paramName: string) {
        return searchParams.get(paramName)
    }

    // Return the searchParams object and the getQueryParam function
    return { searchParams, getQueryParam }
}

export default useQueryParams
