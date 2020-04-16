import sequelize from "../../../server"
export class Service {

    static async getQuery(queryString, params = []) {
        const queryOptions = {
            type: sequelize.QueryTypes.SELECT
        }

        if(params.length) {
            queryOptions.replacements = params
        }

        return await sequelize.query(queryString, queryOptions)
    }

    static async setQuery(queryString, params = []) {
        const queryOptions = {}

        if(params.length) {
            queryOptions.replacements = params
        }

        return await sequelize.query(queryString, queryOptions)
    }
}