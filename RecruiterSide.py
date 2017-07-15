import happybase

def findMatches(skillsArr):
    connection = happybase.Connection('localhost')
    connection.open()
    table2 = connection.table('job')
    results = [];
    for key, value in table2.scan():
        companyDict = {};
        matches = []
        companyDict['position'] =
        companyDict['company'] =
        lengthOfSkillSet = 0;
        for quals in :
            lengthOfSkillSet += 1
            for vals in skillsArr:
                if == vals:
                    matches.add(vals)
        companyDict['matches'] = matches
        percentage = int(100 * len(matches)/lengthOfSkillSet)
        companyDict['percentage'] = percentage
        results.add(companyDict)
    return results
