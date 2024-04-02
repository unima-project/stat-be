import {userType} from "../../models";
import {Button} from "@mui/material";
import * as React from "react";

const columnsConfig = {
    ID: {
        id: 'id'
        , label: 'Id'
        , minWidth: 10
    }
    , USER: {
        id: 'user'
        , label: 'User'
        , minWidth: 50
    }
    , CORPUS: {
        id: 'corpus'
        , label: 'Corpus'
        , minWidth: 50
    }
    , PUBLIC: {
        id: 'public'
        , label: 'Public'
        , minWidth: 10
    }
    , CREATED_AT: {
        id: 'created_at'
        , label: 'Created At'
        , minWidth: 10
    }
    , ACTION: {
        id: 'action'
        , label: ''
        , minWidth: 10
    }
}

export default class CorpusConfig {
    constructor(userLevel) {
        this.userLevel = userLevel;
        this.columns = columnsConfig;
    }

    columnsAdminConfig = () => {
        this.columns = columnsConfig;
        return this
    }

    columnsMemberConfig = () => {
        let columns = {};

        for (const col in columnsConfig) {
            const currentCol = columnsConfig[col]
            if (currentCol.id === 'user') {
                continue
            }

            columns[col] = {
                id: currentCol.id
                , label: currentCol.label
                , minWidth: currentCol.minWidth
            };
        }


        this.columns = columns;
        return this
    }

    columnsPublicConfig = () => {
        let columns = {};

        for (const col in columnsConfig) {
            const currentCol = columnsConfig[col]
            if (currentCol.id === 'user' || currentCol.id === 'public') {
                continue
            }

            columns[col] = {
                id: currentCol.id
                , label: currentCol.label
                , minWidth: currentCol.minWidth
            };
        }


        this.columns = columns;
        return this
    }

    SetColumns = () => {
        this.columns = this.userLevel === userType.USER_ADMIN
            ? this.columnsAdminConfig().columns : this.userLevel === userType.USER_MEMBER
                ? this.columnsMemberConfig().columns : this.columnsPublicConfig().columns

        return this
    }
}