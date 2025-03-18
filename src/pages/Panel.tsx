import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  Search, 
  Users,
  Calendar,
  ArrowUpDown,
  Info,
  BarChart2,
  Eye
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InterviewForm } from "@/components/interviews/InterviewForm";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { Placeholder } from "@/components/Placeholder";
import { useAppState, Interview, Applicant } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Panel = () => {
  const { interviews, applicants, addInterview, updateInterview, deleteInterview } = useAppState();
  const navigate = useNavigate();
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("interviews");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({ key: "createdAt", direction: "desc" });
  
  const handleCreateInterview = (data: Omit<Interview, "id" | "createdAt">) => {
    addInterview(data);
    setCreateDialogOpen(false);
  };
  
  const handleEditInterview = (data: Omit<Interview, "id" | "createdAt">) => {
    if (currentInterview) {
      updateInterview(currentInterview.id, data);
      setEditDialogOpen(false);
      setCurrentInterview(null);
    }
  };
  
  const handleDeleteInterview = (id: string) => {
    deleteInterview(id);
  };
  
  const openEditDialog = (interview: Interview) => {
    setCurrentInterview(interview);
    setEditDialogOpen(true);
  };
  
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    
    setSortConfig({ key, direction });
  };
  
  const filteredInterviews = interviews.filter((interview) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      interview.position.toLowerCase().includes(searchLower) ||
      interview.company.toLowerCase().includes(searchLower) ||
      interview.city.toLowerCase().includes(searchLower)
    );
  });
  
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    const key = sortConfig.key as keyof Interview;
    
    if (a[key] < b[key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  
  const sortedApplicants = [...applicants].sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a.createdAt > b.createdAt) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
  
  const getInterviewForApplicant = (interviewId: string) => {
    return interviews.find(i => i.id === interviewId);
  };
  
  const formatDate = (date: Date) => {
    return format(date, "d MMMM yyyy, HH:mm", { locale: ru });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
            <p className="text-gray-600">
              Создавайте и управляйте собеседованиями, просматривайте заявки кандидатов и статистику
            </p>
          </div>
          
          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab}
            className="bg-white rounded-lg shadow-sm p-6 border"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <TabsList>
                <TabsTrigger value="interviews" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Собеседования
                </TabsTrigger>
                <TabsTrigger value="applicants" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Кандидаты
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Статистика
                </TabsTrigger>
              </TabsList>
              
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                
                {currentTab === "interviews" && (
                  <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Создать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Создать собеседование</DialogTitle>
                        <DialogDescription>
                          Заполните информацию о вакансии и деталях собеседования
                        </DialogDescription>
                      </DialogHeader>
                      <InterviewForm onSubmit={handleCreateInterview} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            
            <TabsContent value="interviews" className="mt-0">
              {sortedInterviews.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead onClick={() => requestSort("position")} className="cursor-pointer w-1/4">
                          <div className="flex items-center">
                            Должность
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead onClick={() => requestSort("company")} className="cursor-pointer">
                          <div className="flex items-center">
                            Компания
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead onClick={() => requestSort("views")} className="cursor-pointer">
                          <div className="flex items-center">
                            Просмотры
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead onClick={() => requestSort("city")} className="cursor-pointer">
                          <div className="flex items-center">
                            Город
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-center">Кандидаты</TableHead>
                        <TableHead className="w-[180px]">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedInterviews.map((interview) => {
                        const applicantCount = applicants.filter(a => a.interviewId === interview.id).length;
                        
                        return (
                          <TableRow key={interview.id}>
                            <TableCell className="font-medium">{interview.position}</TableCell>
                            <TableCell>{interview.company}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1 text-gray-500" />
                                {interview.views || 0}
                              </div>
                            </TableCell>
                            <TableCell>{interview.city}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="flex items-center justify-center mx-auto w-10">
                                <Users className="h-3 w-3 mr-1" />
                                {applicantCount}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/interview/${interview.id}`)}
                                      >
                                        <Info className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Просмотреть страницу</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openEditDialog(interview)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  {currentInterview && currentInterview.id === interview.id && (
                                    <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle>Редактировать собеседование</DialogTitle>
                                        <DialogDescription>
                                          Измените информацию о вакансии и деталях собеседования
                                        </DialogDescription>
                                      </DialogHeader>
                                      <InterviewForm
                                        initialData={currentInterview}
                                        onSubmit={handleEditInterview}
                                      />
                                    </DialogContent>
                                  )}
                                </Dialog>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Удалить собеседование</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Вы действительно хотите удалить собеседование для должности "{interview.position}"?
                                        Это действие нельзя отменить.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteInterview(interview.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Удалить
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Placeholder
                  title="Собеседования не найдены"
                  description={
                    searchQuery
                      ? "Попробуйте изменить параметры поиска"
                      : "Нажмите кнопку 'Создать', чтобы добавить первое собеседование"
                  }
                />
              )}
            </TabsContent>
            
            <TabsContent value="applicants" className="mt-0">
              {sortedApplicants.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/4">Имя</TableHead>
                        <TableHead>Возраст</TableHead>
                        <TableHead>Номер телефона</TableHead>
                        <TableHead>Вакансия</TableHead>
                        <TableHead>Код Telegram</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Дата заявки</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedApplicants.map((applicant) => {
                        const interview = getInterviewForApplicant(applicant.interviewId);
                        
                        return (
                          <TableRow key={applicant.id}>
                            <TableCell className="font-medium">{applicant.name}</TableCell>
                            <TableCell>{applicant.age}</TableCell>
                            <TableCell>{applicant.phone}</TableCell>
                            <TableCell>
                              {interview ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger className="underline text-interview cursor-pointer">
                                      {interview.position}
                                    </TooltipTrigger>
                                    <TooltipContent className="w-80 p-0" align="start" side="bottom">
                                      <InterviewCard interview={interview} compact />
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : (
                                <span className="text-gray-500">Удалена</span>
                              )}
                            </TableCell>
                            <TableCell>{applicant.telegramCode}</TableCell>
                            <TableCell>
                              {applicant.verified ? (
                                <Badge className="bg-green-500">Подтвержден</Badge>
                              ) : (
                                <Badge variant="outline">Ожидает подтверждения</Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(applicant.createdAt)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Placeholder
                  title="Заявки не найдены"
                  description="Пока нет кандидатов, заполнивших анкету"
                />
              )}
            </TabsContent>
            
            <TabsContent value="statistics" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatisticsCard 
                  title="Просмотры вакансий" 
                  value={interviews.reduce((sum, interview) => sum + (interview.views || 0), 0)}
                  icon={<Eye className="h-5 w-5 text-blue-500" />}
                  description="Общее количество просмотров всех вакансий"
                />
                
                <StatisticsCard 
                  title="Кандидаты" 
                  value={applicants.length}
                  icon={<Users className="h-5 w-5 text-green-500" />}
                  description="Общее количество поданных заявок"
                />
                
                <StatisticsCard 
                  title="Конверсия" 
                  value={`${interviews.reduce((sum, interview) => sum + (interview.views || 0), 0) > 0 
                    ? Math.round((applicants.length / interviews.reduce((sum, interview) => sum + (interview.views || 0), 0)) * 100) 
                    : 0}%`}
                  icon={<BarChart2 className="h-5 w-5 text-purple-500" />}
                  description="Процент просмотров, завершившихся заявкой"
                />
                
                <StatisticsCard 
                  title="Подтвержденные кандидаты" 
                  value={applicants.filter(a => a.verified).length}
                  icon={<Users className="h-5 w-5 text-interview" />}
                  description="Кандидаты, подтвердившие код из Telegram"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const StatisticsCard = ({ 
  title, 
  value, 
  icon, 
  description 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold mt-4">{value}</p>
    </div>
  );
};

export default Panel;
