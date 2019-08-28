type JiraTime = {
    originalEstimate?: number;
    actualTimeSpent?: number;
};

export default function calculateEstimationAccuracy(jiraTime: JiraTime): number {
    // tasks originalEstimate = 0, should not get passed in. We can't calculate estimation accuracy on something that wasn't estimated.
    if (jiraTime.originalEstimate === 0 || typeof jiraTime.originalEstimate !== 'number' || typeof jiraTime.actualTimeSpent !== 'number') {
        return null;
    }
    const decrease = jiraTime.originalEstimate - jiraTime.actualTimeSpent;
    return -1 * ((decrease / jiraTime.originalEstimate) * 100);
}
