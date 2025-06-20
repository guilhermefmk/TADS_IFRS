def predict_class(duration_minutes, budget, gross_world_wide):
    if duration_minutes <= 102.50:
        if budget <= 2250000.00:
            if gross_world_wide <= 121667.00:
                if budget <= 390000.00:
                    return "médio"
                else:
                    return "baixo"
            else:
                if gross_world_wide <= 21869405.00:
                    return "médio"
                else:
                    return "baixo"
        else:
            if duration_minutes <= 96.50:
                if gross_world_wide <= 210879160.00:
                    return "baixo"
                else:
                    return "médio"
            else:
                if gross_world_wide <= 314780400.00:
                    return "médio"
                else:
                    return "médio"
    else:
        if duration_minutes <= 125.50:
            if budget <= 29500000.00:
                if gross_world_wide <= 204318064.00:
                    return "médio"
                else:
                    return "médio"
            else:
                if gross_world_wide <= 53539258.00:
                    return "médio"
                else:
                    return "médio"
        else:
            if duration_minutes <= 145.50:
                if budget <= 4567500.00:
                    return "médio"
                else:
                    return "médio"
            else:
                if budget <= 750000000.00:
                    return "médio"
                else:
                    return "baixo"


# Exemplo de uso
duration_minutes = 100
budget = 500000
gross_world_wide = 200000

predicted_class = predict_class(duration_minutes, budget, gross_world_wide)
print(f"Classe prevista: {predicted_class}")
