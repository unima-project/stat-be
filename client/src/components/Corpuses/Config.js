import {userType} from "../../models";
import {Button} from "@mui/material";
import * as React from "react";

const columnsConfig = {
    ID: {
        id: 'id'
        , label: 'Id'
        , minWidth: 10
        , visible: true
    }
    , USER: {
        id: 'user'
        , label: 'User'
        , minWidth: 50
        , visible: true
    }
    , CORPUS: {
        id: 'corpus'
        , label: 'Corpus'
        , minWidth: 50
        , visible: true
    }
    , PUBLIC: {
        id: 'public'
        , label: 'Public'
        , minWidth: 10
        , visible: true
    }
    , CREATED_AT: {
        id: 'created_at'
        , label: 'Created At'
        , minWidth: 10
        , visible: true
    }
    , ACTION: {
        id: 'action'
        , label: ''
        , minWidth: 10
        , visible: true
    }
}

export default class CorpusConfig {
    constructor(userLevel) {
        this.userLevel = userLevel;
        this.columns = columnsConfig;
    }

    columnsAdminConfig = () => {
        columnsConfig.USER.visible = true
        columnsConfig.PUBLIC.visible = true

        this.columns = columnsConfig;
        return this
    }

    columnsMemberConfig = () => {
        columnsConfig.USER.visible = false
        columnsConfig.PUBLIC.visible = true

        this.columns = columnsConfig;
        return this
    }

    columnsPublicConfig = () => {
        columnsConfig.USER.visible = false
        columnsConfig.PUBLIC.visible = false

        this.columns = columnsConfig;
        return this
    }

    SetColumns = () => {
        this.columns = this.userLevel === userType.USER_ADMIN
            ? this.columnsAdminConfig().columns : this.userLevel === userType.USER_MEMBER
                ? this.columnsMemberConfig().columns : this.columnsPublicConfig().columns

        return this
    }
}