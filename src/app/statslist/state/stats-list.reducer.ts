import { StatsListActions, StatsListActionTypes } from './stats-list.actions';
import { Project } from '../stats-client/models/Project';
import { TransformedProject } from '../models/TransformedProject';

export interface StatsState {
  projects?: TransformedProject[];
  shownProject: string;
}

export const initialState: StatsState = {
  projects: [],
  shownProject: null
};

export function reducer(state = initialState, action: StatsListActions): StatsState {
  switch (action.type) {

    case StatsListActionTypes.LoadedProjects: {
      return {...state, projects: action.list};
    }

    case StatsListActionTypes.LoadedProjectStats: {
      const projects = state.projects.map(p => {
        if (p.name === action['projectName']) {
          const stats = action['stats'];
          return {...p, stats};
        }
        return p;
      });
      return {...state, projects};
    }

    case StatsListActionTypes.ShowProject: {
      return {...state, shownProject: action.projectName};
    }

    default:
      return state;
  }
}
