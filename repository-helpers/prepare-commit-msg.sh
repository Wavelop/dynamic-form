#!/bin/bash

echo "COMMIT MESSAGE LINTING"
echo "."
echo "."

COMMIT_EDITMSG=$1

# This way you can customize which branches should be skipped when
# prepending commit message.
if [ -z "$BRANCHES_TO_SKIP" ]; then
    BRANCHES_TO_SKIP=(release)
fi

if [ -z "$BRANCHES_PROTECTED" ]; then
    BRANCHES_PROTECTED=(master develop)
fi

if [ -z "$COMMIT_TYPES" ]; then
    declare -a COMMIT_TYPES=(build chore ci docs feat fix perf refactor revert style test)
fi

echo "BRANCHES_TO_SKIP:"
echo "$(printf ". %s\n" "${BRANCHES_TO_SKIP[@]}")"
echo "BRANCHES_PROTECTED:" 
echo "$(printf ". %s\n" "${BRANCHES_PROTECTED[@]}")"

# Get branch name and description
BRANCH_NAME=$(git branch | grep '*' | sed 's/* //')
BRANCH_EXCLUDED_FROM_PROTECTED=$(printf "%s\n" "${BRANCHES_PROTECTED[@]}" | grep -c "^$BRANCH_NAME$")

if ! [[ $BRANCH_EXCLUDED_FROM_PROTECTED -ge 1 ]];
then
    
    BRANCH_TYPE=`echo $BRANCH_NAME | cut -d \/ -f 1`
    BRANCH_NUMBER=`echo $BRANCH_NAME | cut -d \/ -f 2`
    
    # Branch is someting like feature/12, hotfix/1234 or release/1.2.1
    if ! [[ $BRANCH_TYPE -ge $BRANCH_NUMBER ]];
    then
        
        if [[ $BRANCH_TYPE == "feature" ]];
        then
            BRANCH_TYPE_SRT=feat
        fi
        
        if [[ $BRANCH_TYPE == "hotfix" ]];
        then
            BRANCH_TYPE_SRT=fix
        fi
        
        if [[ $BRANCH_TYPE == "release" ]];
        then
            BRANCH_TYPE_SRT=build
        fi
        
        # Branch name should be excluded from the prepend
        BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_TYPE$")
        
        echo "IS THIS BRANCH EXCLUDED: $BRANCH_EXCLUDED"
        
        # A developer has already prepended the commit in one of the formats:
        #   TYPE:               -> i.e. feat: <title>
        #   TYPE(#COMMIT-ID):   -> i.e. feat(#1): <title>
        # 
        # See COMMIT_TYPES for all the types available
                      
        for i in "${COMMIT_TYPES[@]}"
        do
            OVERRIDE_PREPEND_WITH_ID_TEMP=$(grep -c "$i(#$BRANCH_NUMBER):" $COMMIT_EDITMSG)
            OVERRIDE_PREPEND_WITH_ID=$(( $OVERRIDE_PREPEND_WITH_ID + $OVERRIDE_PREPEND_WITH_ID_TEMP ))
            
            OVERRIDE_PREPEND_TEMP=$(grep -c "$i:" $COMMIT_EDITMSG)
            OVERRIDE_PREPEND=$(( $OVERRIDE_PREPEND + $OVERRIDE_PREPEND_TEMP ))
        done
                
        echo "DOES COMMIT MESSAGE OVERRIDE PREPEND: $OVERRIDE_PREPEND"
        echo "DOES COMMIT MESSAGE OVERRIDE PREPEND_WITH_ID: $OVERRIDE_PREPEND_WITH_ID"
        
        if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $OVERRIDE_PREPEND_WITH_ID -ge 1 ]] && ! [[ $OVERRIDE_PREPEND -ge 1 ]];
        then
            echo "Appling autoprepending..."
            sed -i.bak -e "1s~^~$BRANCH_TYPE_SRT(#$BRANCH_NUMBER): ~" $COMMIT_EDITMSG
        else
            if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $OVERRIDE_PREPEND_WITH_ID -ge 1 ]] && [[ $OVERRIDE_PREPEND -ge 1 ]];
            then
                echo "Skipping autoprepending..."                
                echo "Adding information about the branch to the commit..."
                echo ""  >> $COMMIT_EDITMSG
                echo ""  >> $COMMIT_EDITMSG
                echo ""  >> $COMMIT_EDITMSG
                echo "Issue type: $BRANCH_TYPE_SRT" >> $COMMIT_EDITMSG
                echo "Issue number: #$BRANCH_NUMBER" >> $COMMIT_EDITMSG                          
            else
                echo "!! Something went wrong on prepending issue type to the commit."
            fi
        fi
    fi
else
    echo "$BRANCH_NAME is a protected branch. For these branches ($BRANCHES_PROTECTED) you cannot prepend anything."
fi

echo "."
echo "."
echo "COMMIT MESSAGE LINTING DONE!"