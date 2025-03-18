import React, { useState } from "react";
import { useAppState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { InterviewMobileForm } from "@/components/interviews/InterviewMobileForm";
import { 
  BriefcaseBusiness, 
  Plus, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Search, 
  ChevronLeft,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const WebApp = () => {
  const { interviews, applicants, addInterview } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "detail" | "stats" | "create">("list");
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null);

  // Get filtered interviews
  const filteredInterviews = interviews
    .filter(interview => 
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Count statistics
  const totalViews = interviews.reduce((sum, interview) => sum + interview.views, 0);
  const totalApplicants = applicants.length;
  const interviewWithApplicants = interviews.map(interview => {
    const interviewApplicants = applicants.filter(a => a.interviewId === interview.id);
    return {
      ...interview,
      applicantsCount: interviewApplicants.length
    };
  });

  const handleInterviewClick = (id: string) => {
    setSelectedInterview(id);
    setCurrentView("detail");
  };

  const handleBackClick = () => {
    setCurrentView("list");
    setSelectedInterview(null);
  };

  const handleCreateClick = () => {
    setCurrentView("create");
  };

  const handleCreateInterview = (interviewData: any) => {
    addInterview(interviewData);
    setCurrentView("list");
  };

  const renderDetailView = () => {
    if (!selectedInterview) return null;
    
    const interview = interviews.find(i => i.id === selectedInterview);
    if (!interview) return null;
    
    const interviewApplicants = applicants.filter(a => a.interviewId === interview.id);
    
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          className="pl-0 mb-2 -ml-2" 
          onClick={handleBackClick}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>
        
        <InterviewCard interview={interview} />
        
        <div className="bg-white p-4 rounded-lg shadow-sm border mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Статистика</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Просмотры</div>
              <div className="text-xl font-semibold">{interview.views}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-gray-500">Кандидаты</div>
              <div className="text-xl font-semibold">{interviewApplicants.length}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Кандидаты</h3>
          {interviewApplicants.length > 0 ? (
            <div className="space-y-3">
              {interviewApplicants.map(applicant => (
                <div key={applicant.id} className="bg-white p-4 rounded-lg shadow-sm border">
                  <div><span className="font-medium">Имя:</span> {applicant.name}</div>
                  <div><span className="font-medium">Возраст:</span> {applicant.age}</div>
                  <div><span className="font-medium">Телефон:</span> {applicant.phone}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Пока нет кандидатов
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStatsView = () => {
    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-3">Общая статистика</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md flex flex-col items-center">
              <BarChart3 className="h-6 w-6 text-interview mb-1" />
              <div className="text-2xl font-bold">{totalViews}</div>
              <div className="text-sm text-gray-500">Просмотров</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md flex flex-col items-center">
              <Users className="h-6 w-6 text-interview mb-1" />
              <div className="text-2xl font-bold">{totalApplicants}</div>
              <div className="text-sm text-gray-500">Кандидатов</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-3">Статистика по собеседованиям</h3>
          <div className="space-y-3">
            {interviewWithApplicants.sort((a, b) => b.views - a.views).map(interview => (
              <div 
                key={interview.id} 
                className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => handleInterviewClick(interview.id)}
              >
                <div className="font-medium">{interview.position}</div>
                <div className="text-sm text-gray-500 mb-2">{interview.company}</div>
                <div className="flex justify-between text-sm">
                  <div><span className="text-gray-500">Просмотры:</span> {interview.views}</div>
                  <div><span className="text-gray-500">Кандидаты:</span> {interview.applicantsCount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск собеседований..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-4 mb-4">
          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview) => (
              <div 
                key={interview.id} 
                className="bg-white p-4 rounded-lg shadow-sm border cursor-pointer hover:border-interview transition-colors"
                onClick={() => handleInterviewClick(interview.id)}
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{interview.position}</h3>
                    <p className="text-gray-600 text-sm">{interview.company}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 self-center" />
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <div className="text-gray-500">
                    <span>👁️ {interview.views}</span>
                    <span className="ml-3">👤 {applicants.filter(a => a.interviewId === interview.id).length}</span>
                  </div>
                  <div className="text-gray-500">
                    {interview.city}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "Ничего не найдено" : "Нет собеседований"}
            </div>
          )}
        </div>
        
        <Link to="/panel">
          <Button className="fixed bottom-16 right-4 rounded-full shadow-lg h-12 w-12 p-0">
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    );
  };

  const renderCreateView = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            className="pl-0 -ml-2" 
            onClick={handleBackClick}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <h2 className="text-lg font-semibold">Новое собеседование</h2>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <InterviewMobileForm onSubmit={handleCreateInterview} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {currentView === "list" || currentView === "stats" ? (
        <div className="bg-white p-4 mb-4 border-b shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BriefcaseBusiness className="h-6 w-6 text-interview mr-2" />
              <span className="font-semibold text-lg">Interview Manager</span>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="container mx-auto px-4 pb-4">
        {currentView === "detail" ? (
          renderDetailView()
        ) : currentView === "create" ? (
          renderCreateView()
        ) : (
          <Tabs defaultValue="interviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="interviews" onClick={() => setCurrentView("list")}>Собеседования</TabsTrigger>
              <TabsTrigger value="stats" onClick={() => setCurrentView("stats")}>Статистика</TabsTrigger>
            </TabsList>
            <TabsContent value="interviews">
              {renderListView()}
            </TabsContent>
            <TabsContent value="stats">
              {renderStatsView()}
            </TabsContent>
          </Tabs>
        )}
      </div>
      
      {(currentView === "list" || currentView === "stats") && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
          <div className="grid grid-cols-2 divide-x">
            <button 
              className={`p-3 flex flex-col items-center ${currentView === "list" ? "text-interview" : "text-gray-500"}`}
              onClick={() => setCurrentView("list")}
            >
              <BriefcaseBusiness className="h-5 w-5 mb-1" />
              <span className="text-xs">Собеседования</span>
            </button>
            <button 
              className={`p-3 flex flex-col items-center ${currentView === "stats" ? "text-interview" : "text-gray-500"}`}
              onClick={() => setCurrentView("stats")}
            >
              <BarChart3 className="h-5 w-5 mb-1" />
              <span className="text-xs">Статистика</span>
            </button>
          </div>
        </div>
      )}
      
      {currentView === "list" && (
        <Button 
          className="fixed bottom-16 right-4 rounded-full shadow-lg h-12 w-12 p-0"
          onClick={handleCreateClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default WebApp;
