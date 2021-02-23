export const apiCalls = (axios) => {
  return {
    createMatch: async (data) => {
      const response = await axios.post("/match", data,{
        withCredentials: true,
      });
      return response;
    },
    updateToss: async (data, matchId) => {
      const response = await axios.patch(`/toss/${matchId}`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    getAllMatchData: async () => {
      const response = await axios.get("/matchdata",{
        withCredentials: true,
      });
      return response.data;
    },
    getTenBalls: async (matchId, innings) => {
      const response = await axios.get(`/balls/${matchId}/${innings}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getLiveData: async (matchId) => {
      const response = await axios.get(`/livematch/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getMatchInfo: async (matchId) => {
      try {
        const response = await axios.get(`/matchinfo/${matchId}`,{
          withCredentials: true,
        });
        return response;
      } catch (error) {
        if (error.response.status === 403) {
          return error.response;
        }
      }
    },
    userSignup: async (data) => {
      const response = await axios.post("/user/", data, {
        withCredentials: true,
      });
      return response.data;
    },
    userLogin: async (data) => {
      const response = await axios.post("/user/login/", data, {
        withCredentials: true,
      });
      return response.data;
    },
    updateMatchInfo: async (data, matchId) => {
      const response = await axios.patch(`/matchinfo/${matchId}`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    // user logout
    userLogout: async () => {
      const response = await axios.get("/logout/", { withCredentials: true });
      return response.data;
    },
    getMatchData: async (matchId) => {
      const response = await axios.get(`/matchdata/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getCommentary: async (matchId) => {
      const response = await axios.get(`/balls/match/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    updateLiveScore: async (data) => {
      const response = await axios.post("/livematch", data,{
        withCredentials: true,
      });
      return response.data;
    },
    undoLiveScore: async (data, ballId) => {
      const response = await axios.patch(`/livematch/${ballId}`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    changeStrick: async (data, matchId) => {
      const response = await axios.patch(`/playerstats/${matchId}`, data,{
        withCredentials: true,
      });
      return response;
    },
    getPlayer: async (playerId, matchId) => {
      const response = await axios.get(`/playerdata/${playerId}/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getTeams: async (matchId) => {
      const response = await axios.get(`/playerdata/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getHighlights: async (matchId) => {
      const response = await axios.get(`/highlights/${matchId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getScoreCard: async (matchId, batId, bowlId, innings) => {
      const response = await axios.get(`/scorecard/${matchId}`,{
        withCredentials: true,
      });
      const Data = response.data.data;
      const firstInnigsBatting = [];
      const firstInningsBowling = [];
      const secondInnigsBatting = [];
      const secondInningsBowling = [];
      const Innings = [];
      Data.matchScoreCard.map((player) => {
        if (innings === 1) {
          if (player.teamId === batId) {
            firstInnigsBatting.push(player);
          } else {
            firstInningsBowling.push(player);
          }
        } else {
          if (player.teamId === batId) {
            secondInnigsBatting.push(player);
            firstInningsBowling.push(player);
          } else {
            secondInningsBowling.push(player);
            firstInnigsBatting.push(player);
          }
        }
      });
      Innings.push({
        innings: 1,
        batting: firstInnigsBatting,
        bowling: firstInningsBowling,
      });
      if (innings === 2) {
        Innings.push({
          innings: 2,
          batting: secondInnigsBatting,
          bowling: secondInningsBowling,
        });
      }
      response.data.data.Innings = Innings;
      return response.data;
    },
    verifyUser: async (data, userId) => {
      const response = await axios.patch(`/user/${userId}`, data,{
        withCredentials: true,
      });
      return response;
    },
    checkMatchAdmin: async (matchId, userId) => {
      const userIdString = JSON.stringify(userId);
      const response = await axios.get(
        `/matchadmincheck/${matchId}/${userIdString}`,{
          withCredentials: true,
        }
      );
      return response.data.data.isAdmin;
    },
    deleteBall: async (id) => {
      const resp = await axios.delete(`/balls/${id}`,{
        withCredentials: true,
      });
      return resp.data;
    },
    checkTeamOwner: async (teamId, userId) => {
      const userIdString = JSON.stringify(userId);
      const response = await axios.get(
        `/teamownercheck/${teamId}/${userIdString}`,{
          withCredentials: true,
        }
      );
      return response.data.data.isOwner;
    },
    subscribeToMatch: async (data) => {
      const response = await axios.post("/subscription", data,{
        withCredentials: true,
      });
      return response.data;
    },

    getSubscribedMatches: async (userId) => {
      const response = await axios.get(`/subscription/${userId}`,{
        withCredentials: true,
      });
      return response.data;
    },

    removeSubscription: async (id) => {
      const response = await axios.delete(`/subscription/${id}`,{
        withCredentials: true,
      });
      return response.data;
    },
    getAllTeams: async () => {
      const response = await axios.get(`/team`,{
        withCredentials: true,
      });
      return response.data;
    },
    createTeam: async (data) => {
      const response = await axios.post(`/team`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    createChallengeMatch: async (data) => {
      const response = await axios.post("/match/challenge", data,{
        withCredentials: true,
      });
      return response;
    },

    getTeamPlayers: async (teamId) => {
      const response = await axios.get(`/player/team/${teamId}`,{
        withCredentials: true,
      });
      return response.data;
    },
    addPlayer: async (data) => {
      const response = await axios.post(`/player`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    clearCompleteMatchData: async (matchId, teamAId, teamBId) => {
      const response = await axios.delete(
        `/match/${matchId}/${teamAId}/${teamBId}`,{
          withCredentials: true,
        }
      );
      return response;
    },

    checkIsMatchVerified: async (matchId) => {
      const response = await axios.get(`/match/isverified/${matchId}`,{
        withCredentials: true,
      });
      return response.data.data.is_verified;
    },
    verifyMatch: async (data, matchId) => {
      const response = await axios.patch(`/match/verify/${matchId}`, data,{
        withCredentials: true,
      });
      return response.data;
    },
    checkisAuthorized:async (matchId, teamId, userId) => {
      const userIdString = JSON.stringify(userId);
      const response = await axios.get(
        `/match/isauthorized/${matchId}/${teamId}/${userIdString}`
      );
      return response.data.data.isValid;
    }
  };
};
