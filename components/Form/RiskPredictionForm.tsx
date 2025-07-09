import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

const RiskPredictionForm = () => {
  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="player_id">Player ID</Label>
            <Input
              id="player_id"
              type="number"
              value={formData.player_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  player_id: Number.parseInt(e.target.value),
                })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={formData.age || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: Number.parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  gender: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Male</SelectItem>
                <SelectItem value="1">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="affluent_loss_prone">Affluent Loss Prone</Label>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  affluent_loss_prone: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No</SelectItem>
                <SelectItem value="1">Yes</SelectItem>
                <SelectItem value="2">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="chase_addict">Chase Addiction</Label>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  chase_addict: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Low</SelectItem>
                <SelectItem value="2">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="impulsive_behaviour_flag">Impulsive Behavior</Label>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  impulsive_behaviour_flag: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">No</SelectItem>
                <SelectItem value="1">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="selfexc_history">Self-Exclusion History</Label>
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  selfexc_history: Number.parseInt(value),
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">Once</SelectItem>
                <SelectItem value="2">Multiple</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="spike_inflation">Spike Inflation %</Label>
            <Input
              id="spike_inflation"
              type="number"
              step="0.01"
              value={formData["spike_inflation_%"] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  "spike_inflation_%": Number.parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="latenight_session">Late Night Session %</Label>
            <Input
              id="latenight_session"
              type="number"
              step="0.01"
              value={formData["latenight_session%_x"] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  "latenight_session%_x": Number.parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="sum_net_result">Net Result</Label>
            <Input
              id="sum_net_result"
              type="number"
              value={formData.sum_net_result_x || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sum_net_result_x: Number.parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="deposit_amount">Deposit Amount</Label>
            <Input
              id="deposit_amount"
              type="number"
              value={formData.deposit_amount_x || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  deposit_amount_x: Number.parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="avg_hands">Avg Hands/Session</Label>
            <Input
              id="avg_hands"
              type="number"
              value={formData["avg_total_hands/session"] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  "avg_total_hands/session": Number.parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="avg_buyin">Avg Buy-in Amount</Label>
            <Input
              id="avg_buyin"
              type="number"
              value={formData.avg_buyin_amount || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  avg_buyin_amount: Number.parseInt(e.target.value),
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="risk_percentage">Risk Percentage</Label>
            <Input
              id="risk_percentage"
              type="number"
              step="0.01"
              value={formData.risk_percentage || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  risk_percentage: Number.parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Predict Addiction Risk
        </Button>
      </form>
    </>
  );
};

export default RiskPredictionForm;
