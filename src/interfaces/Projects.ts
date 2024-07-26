
export interface Projects {
    projectId: number;
    projectCodes: string;
    projectName: string;
    
    prioColor: string;
    progress: number;
    stateColor: string;

    projectDescription: string;
    projectPriority: string;
    projectState: string;
    userId: number;
    projectNombreJours: string;

    projectEndDate: Date;
    projectStartDate: Date;

    projectCreatedAt: Date;
    projectUpdatedAt: Date;

}
