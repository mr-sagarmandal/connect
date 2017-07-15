import happybase
import json


sampleJSON =  [
        {
    		"Company-Name": "Elavon",
    		"Position-Name": "Software Engineer",
    		"Qualifications": ["C", "C++", "Java", "Object Oriented Programming", "C#", "Objective-C"]
    	},
    	{
    		"Company-Name": "HFT Hedge Fund",
    		"Position-Name": "Algorithmic Trading Developer",
    		"Qualifications": ["C", "C++", "Unix", "Low Latency Applications"]
    	},
    	{
    		"Company-Name": "Princeton Consultant",
    		"Position-Name": "Consulting",
    		"Qualifications": ["Data Science", "SciKit Learn"]
    	},
    	{
    		"Company-Name": "Tesla Motors",
    		"Position-Name": "Autopilot Internship/Co-Op",
    		"Qualifications": ["C", "C++", "Computer Vision", "Cuda", "OpenCL", "Python", "Quantitative Analysis"]
    	},
    	{
    		"Company-Name": "Delta Airlines",
    		"Position-Name": "Mechanical Engineer",
    		"Qualifications": ["SQL", "GageRR", "Six Sigma", "AutoCAD", "Inventor", "Solidworks"]
    	},
    	{
    		"Company-Name": "LinkedIn",
    		"Position-Name": "Software Engineering",
    		"Qualifications": ["Python", "Javascript", "Java"]
    	},
    	{
    		"Company-Name": "Intuitive Surgical",
    		"Position-Name": "Clinical Development Engineering",
    		"Qualifications": ["Medical Devices", "Statistics", "Excel"]
    	}
    ]

def jobDescriptionToDB(jobDescriptionsJSON):
    connection = happybase.Connection('localhost')
    connection.open()
    table2 = connection.table('job')

    for jobDict in jobDescriptionsJSON:
<<<<<<< HEAD
        key = jobDict["Position-Name"] + '@' + jobDict["Company-Name"]
        table2.put(key, {'company:name': jobDict["Company-Name"]}
=======
        key = jobDict["Position-Name"] + "@" + jobDict["Company-Name"]
        table2.put(key, {'company:name': jobDict["Company-Name"]})
>>>>>>> ac4b6b8f6e98c19b204c4924c217b5bce3a66970
        counter = 0
        for qualifications in jobDict['Qualifications']:
            col_name = 'qual' + str(counter)
            counter=counter+1
            cf='qualification:'+col_name
            table2.put(key, {cf:qualifications})

jobDescriptionToDB(sampleJSON)
