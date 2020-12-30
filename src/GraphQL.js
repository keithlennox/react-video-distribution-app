import { gql } from '@apollo/client';

export const GET_ASSETS = gql`
  query GetAssets {
    allVideos {
      nodes {
        assetType
        description
        keywords
        rightsEnd
        rightsStart
        series
        title
        id
        created
      }
    }
  }
`

export const GET_RESTORES = gql`
  query GetRestores {
    allRestores {
      nodes {
        created
        errorMessage
        restoreJobId
        progress
        status
        videoId
      }
    }
  }
`

export const GET_SCHEDULES = gql`
  query GetSchedules {
    allSchedules {
      nodes {
        created
        createdUserId
        platform
        publishEnd
        publishStart
        status
        updated
        updatedUserId
        videoId
        userByCreatedUserId {
          username
        }
        userByUpdatedUserId {
          username
        }
        videoByVideoId {
          title
          series
        }
      }
    }
  }
`

export const GET_SCHEDULE = gql`
  query GetSchedule($asset: Int!) {
    allSchedules(condition: {videoId: $asset}) {
      nodes {
        scheduleId
        created
        createdUserId
        platform
        publishEnd
        publishStart
        updated
        updatedUserId
        userByCreatedUserId {
          username
        }
        userByUpdatedUserId {
          username
        }
        status
      }
    }
  }
`

export const ADD_SCHEDULE = gql`
mutation AddSchedule($videoId: Int!, $created: Datetime!, $createdUserId: Int!, $updated: Datetime!, $updatedUserId: Int!, $status: String!, $platform: String!, $publishStart: Datetime!, $publishEnd: Datetime!) {
  __typename
  createSchedule(input: {schedule: {
    videoId: $videoId,
    created: $created,
    createdUserId: $createdUserId,
    updated: $updated,
    updatedUserId: $updatedUserId,
    status: $status,
    platform: $platform, 
    publishEnd: $publishEnd,
    publishStart: $publishStart
  }}) {
    clientMutationId
  }
}
`

export const UPDATE_SCHEDULE = gql`
mutation UpdateSchedule($scheduleId: Int!, $publishStart: Datetime!, $publishEnd: Datetime!) {
  updateScheduleByScheduleId(input: {schedulePatch: {
    publishStart: $publishStart, 
    publishEnd: $publishEnd
  }, 
  scheduleId: $scheduleId}) {
    schedule {
      scheduleId
        publishEnd
        publishStart
    }
  }
}
`

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($scheduleId: Int!) {
    __typename
    deleteScheduleByScheduleId(input: {scheduleId: $scheduleId}) {
      clientMutationId
      deletedScheduleId
    }
  }
`

export const GET_INSTANCES = gql`
query GetAllInstances {
  allInstances {
    nodes {
      description
      keywords
      platform
      title
      videoId
      encoderJobId
      instanceJobId
      progress
      status
      errorMessage
      created
    }
  }
}
`

export const GET_INSTANCE = gql`
query GetInstance($asset: Int!) {
  allInstances(condition: {videoId: $asset}) {
    nodes {
      description
      title
      keywords
      platform
      instanceJobId
      created
    }
  }
}
`

//DELETE INSTANCE

export const GET_PLATFORMS = gql`
  query GetPlatforms {
    allPlatforms {
      nodes {
        platform
        encoderWorkflowId
        account
        grouping
        plugin
      }
    }
  }
`

//ADD PLATFORM
//UPDATE PLATFORM
//DELETE PLATFORM

//GET USERS
//ADD USER
//UPDATE USER
//DELETE USER

export const GET_TEMPLATE = gql`
  query GetTemplate($seriesId: Int!) {
    allTemplates(condition: {seriesId: $seriesId}) {
      nodes {
        start
        end
        repeats
        concurrent
        geogateTerritory
        geogateFilter
        assetType
      }
    }
  }
`

//ADD TEMPLATE
//UPDATE TEMPLATE
//DELETE TEMPLATE

export const ADD_COLLECTION = gql`
  mutation AddCollection ($videoId: Int!) {
    __typename
    createCollection(input: {collection: {username: "klennox", videoId: $videoId}}) {
      clientMutationId
    }
  }
`

//DELETE COLLECTION