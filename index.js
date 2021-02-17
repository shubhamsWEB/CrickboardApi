import axios from './axios'

export const createMatch = async (data) => {
  const response = await axios.post('/match', data)
  return response
}

export const updateToss = async (data, matchId) => {
  const response = await axios.patch(`/toss/${matchId}`, data)
  return response.data
}

export const getAllMatchData = async () => {
  const response = await axios.get('/matchdata')
  return response.data
}

export const getTenBalls = async (matchId, innings) => {
  const response = await axios.get(`/balls/${matchId}/${innings}`)
  return response.data
}

export const getLiveData = async (matchId) => {
  const response = await axios.get(`/livematch/${matchId}`)
  return response.data
}

export const getMatchInfo = async (matchId) => {
  try {
    const response = await axios.get(`/matchinfo/${matchId}`)
    return response
  } catch (error) {
    if (error.response.status === 403) {
      return error.response
    }
  }
}

export const userSignup = async (data) => {
  const response = await axios.post('/user/', data,{
    withCredentials: true,
  })
  return response.data
}
export const userLogin = async (data) => {
  const response = await axios.post('/user/login/', data, {
    withCredentials: true,
  })
  return response.data
}

export const updateMatchInfo = async (data, matchId) => {
  const response = await axios.patch(`/matchinfo/${matchId}`, data)
  return response.data
}
// user logout
export const userLogout = async () => {
  const response = await axios.get('/logout/', { withCredentials: true })
  return response.data
}
export const getMatchData = async (matchId) => {
  const response = await axios.get(`/matchdata/${matchId}`)
  return response.data
}

export const getCommentary = async (matchId) => {
  const response = await axios.get(`/balls/match/${matchId}`)
  return response.data
}

export const updateLiveScore = async (data) => {
  const response = await axios.post('/livematch', data)
  return response.data
}

export const undoLiveScore = async (data,ballId) => {
  const response = await axios.patch(`/livematch/${ballId}`, data)
  return response.data
}

export const changeStrick = async (data, matchId) => {
  const response = await axios.patch(`/playerstats/${matchId}`, data)
  return response
}
export const getPlayer = async (playerId, matchId) => {
  const response = await axios.get(`/playerdata/${playerId}/${matchId}`)
  return response.data
}

export const getTeams = async (matchId) => {
  const response = await axios.get(`/playerdata/${matchId}`)
  return response.data
}

export const getHighlights = async (matchId) => {
  const response = await axios.get(`/highlights/${matchId}`)
  return response.data
}

export const getScoreCard = async (matchId, batId, bowlId, innings) => {
  const response = await axios.get(`/scorecard/${matchId}`)
  const Data = response.data.data
  const firstInnigsBatting = []
  const firstInningsBowling = []
  const secondInnigsBatting = []
  const secondInningsBowling = []
  const Innings = []
  Data.matchScoreCard.map((player) => {
    if (innings === 1) {
      if (player.teamId === batId) {
        firstInnigsBatting.push(player)
      } else {
        firstInningsBowling.push(player)
      }
    } else {
      if (player.teamId === batId) {
        secondInnigsBatting.push(player)
        firstInningsBowling.push(player)
      } else {
        secondInningsBowling.push(player)
        firstInnigsBatting.push(player)
      }
    }
  })
  Innings.push({
    innings: 1,
    batting: firstInnigsBatting,
    bowling: firstInningsBowling,
  })
  if (innings === 2) {
    Innings.push({
      innings: 2,
      batting: secondInnigsBatting,
      bowling: secondInningsBowling,
    })
  }
  response.data.data.Innings = Innings

  return response.data
}

export const verifyUser = async (data, userId) => {
  const response = await axios.patch(`/user/${userId}`, data)
  return response
}
export const checkMatchAdmin = async (matchId, userId) => {
  const userIdString = JSON.stringify(userId)
  const response = await axios.get(`/matchadmincheck/${matchId}/${userIdString}`)
  return response.data.data.isAdmin
}

export const deleteBall = async (id) => {
  const resp = await axios.delete(`/balls/${id}`)
  return resp.data;
}

export const checkTeamOwner = async (teamId, userId) => {
  const userIdString = JSON.stringify(userId)
  const response = await axios.get(`/teamownercheck/${teamId}/${userIdString}`)
  return response.data.data.isOwner
}

export const subscribeToMatch = async (data) => {
    const response = await axios.post("/subscription", data);
    return response.data;
  };
  
  export const getSubscribedMatches = async (userId) => {
    const response = await axios.get(`/subscription/${userId}`);
    return response.data;
  };
  
  export const removeSubscription = async (id) => {
    const response = await axios.delete(`/subscription/${id}`);
    return response.data;
  };

  export const getAllTeams = async () => {
    const response = await axios.get(`/team`);
    return response.data;
  };
  export const createTeam = async (data) => {
    const response = await axios.post(`/team`, data);
    return response.data;
  };

  export const createChallengeMatch = async (data) => {
    const response = await axios.post("/match/challenge", data);
    return response;
  };
  
  export const getTeamPlayers = async (teamId) => {
    const response = await axios.get(`/player/team/${teamId}`);
    return response.data;
  };
  export const addPlayer = async (data) => {
    const response = await axios.post(`/player`, data);
    return response.data;
  };

  export const clearCompleteMatchData = async (matchId, teamAId, teamBId) => {
    const response = await axios.delete(
      `/match/${matchId}/${teamAId}/${teamBId}`
    );
    return response;
  };
  
  export const checkIsMatchVerified = async (matchId) => {
    const response = await axios.get(`/match/isverified/${matchId}`);
    return response.data.data.is_verified;
  };
  export const verifyMatch = async (data, matchId) => {
    const response = await axios.patch(`/match/verify/${matchId}`, data);
    return response.data;
  };