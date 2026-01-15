# Decision Autopilot - Agent Flow

## Multi-Agent Pipeline

The system processes decisions through a sequential pipeline of 5 specialized agents:

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐    ┌────────────┐    ┌─────────────┐
│  Decomposer │───►│  Adversarial │───►│ Experiment Plan │───►│ Confidence │───►│ Stakeholder │
│   Agent     │    │    Agent     │    │     Agent       │    │   Agent    │    │   Agent     │
└─────────────┘    └──────────────┘    └─────────────────┘    └────────────┘    └─────────────┘
     │                   │                    │                     │                  │
     ▼                   ▼                    ▼                     ▼                  ▼
  Extracts:           Generates:          Designs:             Produces:          Predicts:
  - Claims            - Failure           - Experiments        - PROCEED          - Reactions
  - KPIs                scenarios         - Success            - DELAY            - Sentiment
  - Assumptions       - Triggers            criteria           - ABORT            - Friction
  - Risks             - Warnings          - Kill signals       - Confidence %       points
```

## Agent Details

### 1. Decision Decomposer
**File**: `backend/app/agents/decomposer.py`  
**Input**: Decision statement + optional context  
**Output**: Structured decomposition with claims, KPIs, assumptions, risks

### 2. Adversarial Scenario Generator  
**File**: `backend/app/agents/adversarial.py`  
**Input**: Decision decomposition  
**Output**: Failure scenarios with severity levels and warning signals

### 3. Experiment Planner
**File**: `backend/app/agents/experiment_planner.py`  
**Input**: Decomposition + scenarios  
**Output**: Actionable experiments with success criteria and kill conditions

### 4. Confidence Synthesizer
**File**: `backend/app/agents/confidence.py`  
**Input**: All previous outputs  
**Output**: Final verdict (PROCEED/DELAY/ABORT) with confidence score

### 5. Stakeholder Simulator
**File**: `backend/app/agents/stakeholder.py`  
**Input**: Decomposition + verdict  
**Output**: Predicted organizational reactions

## Orchestrator

The `orchestrator.py` chains agents together:

```python
result1 = decomposer.run(input)
result2 = adversarial.run(result1)
result3 = experiments.run(result2)
final = confidence.run(result3)
stakeholders = stakeholder.run(result1, final)
```
